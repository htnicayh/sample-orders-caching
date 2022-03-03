import { ValidationPipe } from "@nestjs/common"

export const PipeValidate = new ValidationPipe({
    whitelist: true
})