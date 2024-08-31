import { model, models, Schema } from "mongoose";

const EventSchema = new Schema(
  {
    type: String, // click or view
    page: String, // for example "dawid"
    uri: String, // /dawid | https://
    key:Number,
    count:{
      type:Number,
      default:0
    },
    date:{
      type:String,
      default:0,
      unique:true
    }
  },
  { timestamps: true }
);

export const Event = models?.Event || model("Event", EventSchema);
