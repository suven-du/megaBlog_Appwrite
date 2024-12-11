import conf from '../conf/conf'
import { Client, Account, ID } from "appwrite";

export class Authservice{
   client=new Client();
   account;
   //we can use the account directly like client but directly create account inside class is a wastage of resource thatswhy when an object will create then automatically account will be create through constructor.
   constructor(){
    if (!conf.appwriteUrl || !conf.appwriteProjectId) {
        throw new Error("Appwrite configuration values are missing.");
    }
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
    this.account=new Account(this.client);
    
   }
  
   async createAccount({email,password,name}){
    try {
        const userAccount=await this.account.create(ID.unique(),email,password,name);
        if(userAccount){
            //call another method
            return this.login({email,password})
        }else{
            return userAccount;
        }
    } catch (error) {
        throw error
    }
   }
   async login({email,password}){
       try {
          return await this.account.createEmailPasswordSession(email ,password)
       } catch (error) { 
          throw error
       }
   }
   async getCurrentUser(){
    try{
        const user=await this.account.get();
        return user;
    }catch(error){
       console.log("Appwrite service :: getCurrentUser :: error",error)
       if(error.code>=400){
        console.warn("User is not authenticated.");
       }
       return null;
    }
      
   }
   async logout(){
    try{
        await this.account.deleteSessions();
    }catch(error){
       console.log("Appwrite service :: logout :: error",error)

    }
   }
}

 
const authservice=new Authservice()
export default authservice