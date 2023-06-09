export function validate(type,input){
    if(type === 'PASSWORD'){
        if(input.length === 0){
            console.log("Password must not be empty");
            return false;
        }
        else if(input.length < 8){
            console.log("Password must be atleast 8 characters long");
            return false;
        }
        else return true;
    }
}