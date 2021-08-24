import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import * as AWS from "aws-sdk";

// access Key = AKIARI6J4PMKQURZYYIA 
// access scret = 8IjUK4/KVxPQ700GcKUf0gu1rOHD1Jg+KpNw7OB5 

const BUCKET_NAME = 'kimchinjohn123';

@Controller("uploads")
export class UploadsController {
    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file:any) {
        AWS.config.update({
            credentials: {
              accessKeyId: 'AKIARI6J4PMKQURZYYIA ',
              secretAccessKey: '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',
            },
        });
        try {
            const objectName = `${Date.now() + file.originalname}`;
            await new AWS.S3()
              .putObject({
                Body: file.buffer,
                Bucket: BUCKET_NAME,
                Key: objectName,
                ACL: 'public-read',
              })
              .promise();
            const url = `https://${BUCKET_NAME}.s3.amazonaws.com/${objectName}`;
            return { url };
          } catch (e) {
            return null;
          }  
    }
}