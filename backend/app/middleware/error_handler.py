from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi.encoders import jsonable_encoder

async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = exc.errors()
    formatted_errors = []
    for err in errors:
        loc = " -> ".join([str(x) for x in err.get("loc", []) if x != "body"])
        msg = err.get("msg", "Invalid field value")
        formatted_errors.append(f"{loc}: {msg}" if loc else msg)
    
    message = "; ".join(formatted_errors) if formatted_errors else "Invalid request data."
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content=jsonable_encoder({"detail": message, "errors": errors})
    )

async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )

async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An unexpected internal server error occurred."}
    )
