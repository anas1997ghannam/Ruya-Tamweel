
import mongoose,{ Schema, model, models } from "mongoose";

const ArticleSchema=new Schema(
    {
        title:{
            type:String,
            require:true,
        },
        content:{
            type:String,
            require:true,
        },
        authorId:{
            type:Schema.Types.ObjectId,
            ref:"User",
            require:true,
        },
        createdAt:{
            type:Date,
            default:Date.now,
        },
    },
    {timestamps:true}
);
export const Article= models.Article || model("Article",ArticleSchema)

