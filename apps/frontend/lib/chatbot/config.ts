// import { NextRequest, NextResponse } from "next/server";
// import OpenAI from 'openai';
// const openapi = new OpenAI({
//     apiKey: process.env.NEXT_PUBLIC_BOT_PASS, // This is the default and can be omitted
// });
// async function main(msg:string):Promise<string> {
//     let getText:string='';
//   try {
//     const chatCompletion = await openapi.chat.completions.create({
//         messages: [{ role: 'user', content:'Say this is a test'  }],
//         model: "text-moderation-007",
//     });
//     console.log(",,,,,,,,,,,,,,,,,,,,,")
//     console.log(chatCompletion);
//     getText="helooooooooooooooooo";
//   } catch (e:any) {
//     console.error("Error While apiCall", e);
//     throw e;
//   }
//   return getText;
// }

// export async function POST(req: NextRequest) {
//     const body= await req.json();
//     if(!body.msg){
//         return NextResponse.json({msg:"Argument Required"},{status:401});
//     }
//     try {
//         let getMsg=await main(body.msg);
//         if(!getMsg){
//             return NextResponse.json({msg:"Open Api called Failed "},{status:500});
//         }
//         return NextResponse.json({msg:"Open Api called succcess ",response:getMsg},{status:200});
//     } catch (e:any) {
//         return NextResponse.json({msg:"Internal server error "},{status:500});
//     }
// }
