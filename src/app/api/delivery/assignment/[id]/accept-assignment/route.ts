import { auth } from "@/auth";
import connectDb from "@/lib/db";
import emitEventHandler from "@/lib/emitEventHandler";
import DeliveryAssignment from "@/models/deliveryAssignmentModel";
import Order from "@/models/order.model";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest, context: { params: Promise<{ id: string; }>;}) {
    try {
        await connectDb()
        const { id } = await context.params
        const session = await auth()
        const deliveryBoyId = session?.user?.id
        if (!deliveryBoyId) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 400 }
            )
        }
        const assignment = await DeliveryAssignment.findById(id)
        if (!assignment) {
            return NextResponse.json(
                { message: "Assignment Not found" },
                { status: 400 }
            )
        }
        if (assignment.status !== "brodcasted") {
            return NextResponse.json(
                { message: "Assignment Expired" },
                { status: 400 }
            )
        }
        const alreadyAssigned = await DeliveryAssignment.findOne({
            assignedTo: deliveryBoyId,
            status: { $nin: ["brodcasted", "completed"] }
        })
        if (alreadyAssigned) {
            return NextResponse.json(
                { message: "Already Assigned to the Order" },
                { status: 400 }
            )
        }

        assignment.assignedTo = deliveryBoyId
        assignment.status = "assigned"
        assignment.acceptedAt = new Date()
        await assignment.save()

        const order = await Order.findById(assignment.order)
        if (!order) {
            return NextResponse.json(
                { message: "Order Not found" },
                { status: 400 }
            )
        }
        order.assignedDeliveryBoy = deliveryBoyId
        order.save()
        await order.populate("assignedDeliveryBoy")
        await emitEventHandler("order-assigned",{orderId:order._id,assignedDeliveryBoy:order.assignedDeliveryBoy})

        await DeliveryAssignment.updateMany(
            {
                _id: { $ne: assignment._id },
                brodcastedTo: deliveryBoyId,
                status: "brodcasted"
            },
            {
                $pull: { brodcastedTo: deliveryBoyId }
            })

        return NextResponse.json(
            { message: "Order Accepted Successfully" },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { message: `accept assignment ${error}` },
            { status: 500 }
        )
    }

}