const {constant}=require("../constant")

const errorHandler = (err, req, res, next)=>{
    const statusCode = res.statusCode?res.statusCode:500;
    switch(statusCode){
        case constant.VALIDATION_ERROR:
            res.json({title:"Validation failed",message: err.message, stackTrace: err.stack});
            break; 
        
        case constant.NOT_FOUND:
            res.json({title:"Not found",message: err.message, stackTrace: err.stack});
            break;

        case constant.UNAUTHORIZED:
            res.json({title:"Unauthorized",message: err.message, stackTrace: err.stack});
            break;

        case constant.FORBIDDEN:
            res.json({title:"Forbidden",message: err.message, stackTrace: err.stack});
            break;
        
        case constant.SERVER_ERROR:
            res.json({title:"Server Error",message: err.message, stackTrace: err.stack});
            break;

        default: 
            console.log("No Error found, good to go!");
            break;
    }
    
};

module.exports=errorHandler;