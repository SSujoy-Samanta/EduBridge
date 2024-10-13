import nodemailer from 'nodemailer';
const transport=nodemailer.createTransport({
    service:'gmail',
    port:465,
    secure:true,
    auth:{
        user:process.env.MAIL_ACC,
        pass:process.env.ACC_PASS
    }
})

export async function sendEmail(otp:string,To:string,subject:string):Promise<boolean> {
    try {
        const receiver={
            from:process.env.MAIL_ACC,
            to:To,
            subject:subject,
            text:`Your Verification otp: ${otp} ; Please don't share with anyone. `,
            html:`
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                    <!-- EduBridge Branding at the Top -->
                    <div cursor: pointer;">
                        <span style="font-weight: 800; font-size: 24px; color: #0ea5e9;">Edu</span>
                        <span style="font-weight: 800; font-size: 24px; color: #15D7F8;">Bridge</span>
                    </div>
                    
                    <!-- Main Content -->
                    <h2 style="color: #0066cc; margin-top: 20px;">Your Verification OTP</h2>
                    <p style="font-size: 16px; color: #333;">Hello,</p>
                    <p style="font-size: 16px; color: #333;">Please use the following OTP to verify your account:</p>
                    <div style="text-align: center; margin: 20px 0;">
                        <p style="font-size: 24px; font-weight: bold; color: #ff3333;">${otp}</p>
                    </div>
                    <p style="font-size: 14px; color: #666;">Please don't share this OTP with anyone. If you didn't request this, please ignore this email.</p>
                    <p style="font-size: 14px; color: #999;">Thank you,<br>Team EduBridge</p>
                </div>
            </div>
        `
        }
        await transport.sendMail(receiver,(e,info)=>{
            if(e){
                console.log(e);
                return false;
            }else{
                console.log(`Email send to ${info.response} `);
                return true
            }
        })
        return true
    } catch (e) {
        console.log('Error occurred:', e);
        throw new Error('Failed to send email');
        return false
    }
}
