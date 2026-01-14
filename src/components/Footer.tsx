'use client'
import React from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { Facebook, Github, Instagram, Linkedin, LinkedinIcon, Mail, MapPin, Phone, Twitter } from 'lucide-react'


function Footer() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className='bg-linear-to-r from-green-600 to-green-700 text-white mt-20 '>
            <div className='w-[90%] md:w-[80%] mx-auto py-10 grid grid-cols-1 md:grid-cols-4 gap-10
    border-b border-green-500/40'>
                <div>
                    <h2 className="text-2xl font-bold mb-3">GroceryGo</h2>
                    <p className='text-sm text-green-100 leading-relaxed'>Your one-stop online grocery store delivering freshness to your doorstep.
                        Shop smart, eat fresh, and save more money every day!
                    </p>
                </div>
                <div>
                    <h2 className='text-xl font-semibold mb-3'>Quick Links</h2>
                    <ul className='space-y-2 text-green-100 text-sm'>
                        <li><Link href={"/"} className='hover:text-white transition'>Home</Link></li>
                        <li><Link href={"/user/cart"} className='hover:text-white transition'>Cart</Link></li>
                        <li><Link href={"/user/my-orders"} className='hover:text-white transition'>My Orders</Link></li>
                    </ul>
                </div>
                <div>
                    <h2 className='text-xl font-semibold mb-3'>UI/UX Designer</h2>
                    <ul className='space-y-2 text-green-100 text-sm'>
                        <li><Link href={"/"} className='hover:text-white transition'>Kalyan Gharti Gurung</Link></li>
                        <li><Link href="https://www.linkedin.com/in/kalyan-gharti-gurung-2b0373326?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" className='hover:text-white transition'>Linked In </Link></li>
                        <li><Link href={""} className='hover:text-white transition'>kalyangharti60@gmail.com</Link></li>
                        <li><Link href="https://github.com/Kalyanghartigurung-git" className='hover:text-white transition'>Kalyanghartigurung-git</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className='text-xl font-semibold mb-3'>Contact Us</h3>
                    <ul className='space-y-2 text-green-100 text-sm'>
                        <li className='flex items-center gap-2'>
                            <MapPin size={16} />Pokhara, Nepal
                        </li>
                        <li className='flex items-center gap-2'>
                            <Phone size={16} />+977 9812345621
                        </li>
                        <li className='flex items-center gap-2'>
                            <Mail size={16} /> support@grocerygo.np
                        </li>
                    </ul>
                    {/* Social Links */}
                    <div className='flex gap-4 mt-4'>
                        <Link href="https://facebook.com" target='_blank'>
                            <Facebook className='w-5 h-5 hover:text-white transition' />
                        </Link>
                        <Link href="https://instagram.com" target='_blank'>
                            <Instagram className='w-5 h-5 hover:text-white transition' />
                        </Link>
                        <Link href="https://twitter.com" target='_blank'>
                            <Twitter className='w-5 h-5 hover:text-white transition' />
                        </Link>
                        <Link href="https://github.com/Susan060/GroceryWebApp" target='_blank'>
                            <Github className='w-5 h-5 hover:text-white transition' />
                        </Link>
                        <Link href="https://www.linkedin.com/in/susan-adhikari-4a084936b" target='_blank'>
                            <Linkedin className='w-5 h-5 hover:text-white transition' />
                        </Link>
                    </div>
                </div>
            </div>

            <div className='text-center py-4 text-sm text-green-100 bg-green-800/40'>
                © {new Date().getFullYear()} <span className="font-semibold">GroceryGo</span> All rights reserved. Developed By Susan Adhikari.
            </div>

        </motion.div>
    )
}

export default Footer
