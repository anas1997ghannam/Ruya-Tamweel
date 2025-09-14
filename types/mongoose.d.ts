import { promises } from "dns";
import mongoose from "mongoose";
declare global{
    namespace globalThis{
        var mongoose:{
            conn:typeof mongoose | null;
            promise:promise<typeof mongoose> | null
        }
    }
}