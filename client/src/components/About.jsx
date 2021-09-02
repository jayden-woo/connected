import React from 'react';
import { Image } from 'react-bootstrap';
import headerImage from '../assets/aboutHeader.png';


const About = () => (

    <div>
        <Image className="center-headerImage" src={headerImage} alt="about header Image" />   
        <h1 style={{textAlign: 'center' , marginTop: 35, color: '#000766'}} > ABOUT US </h1>
        <h2 style={{textAlign: 'center' , margin: 25, marginLeft:260 ,marginRight:260 ,color: '#000766'}}>
        Connected is a service-first CRM company that builds software designed to improve customer relationships.<br/><br/>
        As employees, we encourage each other to grow and innovate. <br/>
        As a company, we roll up our sleeves to plant roots in the communities we call home.<br/><br/>
        Our software is powerful and flexible, and scales to meet the needs of any business. Even yours.
        </h2 >
        <p style={{textAlign: 'left' , margin: 25, marginLeft:200 ,marginRight:200 ,color: '#000766'}}> 
            <b>Connected Customer relationship management (CRM)</b> is a technology for managing all your company’s relationships and interactions with customers and potential 
            customers. The goal is simple: Improve business relationships. Our system helps companies stay connected to customers, streamline processes, and 
            improve profitability.<br/>
            When people talk about CRM, they are usually referring to a CRM system, a tool that helps with contact management, sales management, productivity, 
            and more.<br/>
            Our solution helps you focus on your organisation’s relationships with individual people — including customers, service users, colleagues, or 
            suppliers — throughout your lifecycle with them, including finding new customers, winning their business, and providing support and additional services 
            throughout the relationship.<br/><br/>
            
            <b>Who is CRM for?</b><br/>
            A CRM system gives everyone — from sales, customer service, business development, recruiting, marketing, or any other line of business — a better way to manage 
            the external interactions and relationships that drive success. A CRM tool lets you store customer and prospect contact information, identify sales opportunities, 
            record service issues, and manage marketing campaigns, all in one central location — and make information about every customer interaction available to anyone at your company who 
            need it.<br/>
            With visibility and easy access to data, it is easier to collaborate and increase productivity. Everyone in your company can see how customers have been communicated with, what they’ve 
            bought, when they last purchased, what they paid, and so much more. CRM can help companies of all sizes drive business growth, and it can be especially beneficial to a small business, where 
            teams often need to find ways to do more with less. Our CRM Handbook explains how and why small to medium-sized businesses should consider CRM, plus advice and first steps 
            for getting started.<br/><br/>

            <b>Here’s why CRM matters to your business.</b><br/>
            Gartner predicts that by 2021, CRM will be the single largest revenue area of spending in enterprise software. If your business is going to last, you know that you need 
            a strategy for the future. You have targets for sales, business objectives, and profitability. But getting up-to-date, reliable information on your progress can be tricky. 
            How do you translate the many streams of data coming in from sales, customer service, marketing, and social media monitoring into useful business information?<br/>
            A CRM system can give you a clear overview of your customers. You can see everything in one place — a simple, customisable dashboard that can tell you a customer’s previous history with 
            you, the status of their orders, any outstanding customer service issues, and more.<br/>
            You can even choose to include information from their public social media activity — their likes and dislikes, what they are saying and sharing about you or your competitors. 
            Marketers can use a CRM solution to better understand the pipeline of sales or prospects coming in, making forecasting simpler and more accurate. You’ll have clear visibility of every 
            opportunity or lead, showing you a clear path from inquiries to sales. Some of the biggest gains in productivity can come from moving beyond CRM as a sales and marketing tool, and embedding 
            it in your business – from HR to customer services and supply-chain management.<br/>
            Though CRM systems have traditionally been used as sales and marketing tools, customer service teams are seeing great benefits in using them. Today’s customer might raise an issue in one 
            channel — say, Twitter — and then switch to email or telephone to resolve it in private. A CRM platform lets you manage the inquiry across channels without losing track, and gives sales, service, 
            and marketing a single view of the customer.<br/><br/>


            <b>Running a business without CRM can cost you real money</b><br/>
            More administration means less time for everything else. An active sales team can generate a flood of data. Reps are out on the road talking to customers, meeting prospects, and finding out valuable information 
            – but all too often this information gets stored in handwritten notes, laptops, or inside the heads of your salespeople.<br/>
            Details can get lost, meetings are not followed up on promptly, and prioritising customers can be a matter of guesswork rather than a rigorous exercise based on fact. And it can all be 
            compounded if a key salesperson moves on. But it&apos;s not just sales that suffers without CRM.<br/>
            Your customers may be contacting you on a range of different platforms including phone, email, or social media — asking questions, following up on orders, or contacting you about an issue. 
            Without a common platform for customer interactions, communications can be missed or lost in the flood of information — leading to a slow or unsatisfactory response.<br/>
            Even if you do successfully collect all this data, you’re faced with the challenge of making sense of it. It can be difficult to extract intelligence. Reports can be hard to create and they can 
            waste valuable selling time. Managers can lose sight of what their teams are up to, which means that they can’t offer the right support at the right time – while a lack of oversight can also result 
            in a lack of accountability from the team.<br/><br/>

            <b>What does a CRM system do?</b><br/>
            A customer relationship management (CRM) solution helps you find new customers, win their business, and keep them happy by organising customer and prospect information in a way that helps you build 
            stronger relationships with them and grow your business faster. CRM systems start by collecting a customer&apos;s website, email, telephone, social media data, and more, across multiple sources and 
            channels. It may also automatically pull in other information, such as recent news about the company&apos;s activity, and it can store personal details, such as a client&apos;s personal preferences 
            on communications. The CRM tool organises this information to give you a complete record of individuals and companies overall, so you can better understand your relationship over time.<br/>
            A CRM platform can also connect to other business apps that help you to develop customer relationships. CRM solutions today are more open and can integrate with your favourite business tools, such 
            as document signing, accounting and billing, and surveys, so that information flows both ways to give you a true 360-degree view of your customer.And a new generation of CRM goes one step further: Built-in intelligence automates administrative tasks, like data entry and lead or service case routing, so you can free up time for more 
            valuable activities. Automatically generated insights help you understand your customers better, even predicting how they will feel and act so that you can prepare the right outreach.<br/><br/>

        </p>
    </div>

);

export default About;