export interface AWSConfig {
  region         : string;
  accessKeyId    : string;
  secretAccessKey: string;
}


/**
 * Bucket: Nombre del bucket.
 * Key: Nombre del archivo.
 * Body: Contenido del archivo.
 * ContentType: Tipo de archivo.
 */
export interface S3Params {
  Bucket     : string;
  Key        : string;
  Body       : Buffer;
  ContentType: 'image'
  ACL?       : 'public-read' 
}

export interface S3ParamsGetFile {
  Bucket: string;
  Key   : string;
}

export interface DynamoConfig extends AWSConfig {
  apiVersion: string;
}

export interface AttributeCognito {
  Name : string;
  Value: string;
}