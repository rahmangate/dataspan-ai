import {
  GetObjectCommand,
  S3Client,
  ListObjectsCommand,
  ListBucketsCommand,
} from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { fromIni } from "@aws-sdk/credential-provider-ini";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import AWS from "aws-sdk";

export interface DataRecord {
  image: string;
  thumbnail: string;
  label: string;
}
const albumBucketName = "dataspan.frontend-home-assignment";
const region = "eu-central-1";
const bucketUrl = `https://${albumBucketName}.s3.${region}.amazonaws.com`;
const IdentityPoolId = "eu-central-1:31ebe2ab-fc9d-4a2c-96a9-9dee9a9db8b9";

AWS.config.region = "eu-central-1"; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "eu-central-1:31ebe2ab-fc9d-4a2c-96a9-9dee9a9db8b9",
});

// Initialize S3 client
const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: albumBucketName },
});

export async function listAlbums() {
  try {
    const data = await s3
      .listObjects({
        Bucket: albumBucketName,
        Prefix: "bone-fracture-detection/test/labels/",
        Delimiter: "/",
      })
      .promise();

    const albums = data.CommonPrefixes?.map(function (commonPrefix) {
      var prefix = commonPrefix?.Prefix || "";
      console.log("prefix", prefix);
      var albumName = decodeURIComponent(prefix.toString());
      return albumName;
    });

    return { success: true, data: albums };
  } catch (err) {
    alert("There was an error listing your albums: " + err?.toString());
    return { success: false, message: err?.toString() };
  }
}

export const viewAlbum = async (albumName: string) => {
  try {
    var albumPhotosKey = albumName; // + "/";
    const data = await s3
      .listObjects({
        Bucket: albumBucketName,
        Prefix: albumPhotosKey,
        Delimiter: "/",
      })
      .promise();

    let photos: DataRecord[] = [];
    if (data.Contents) {
      photos = data.Contents?.map((photo) => {
        let root = bucketUrl + "/"; //+ albumName;
        let image = `${root}${photo.Key}`;
        let thumbnail = image.replace(/\.jpg$/, ".txt");
        let label = image.replace(/\.jpg$/, ".txt");
        return { image, thumbnail, label };
      });
    }

    console.log("data success", photos?.length);
    // var photoUrl = bucketUrl + encodeURIComponent(photoKey);
    return { success: true, data: photos };
  } catch (err) {
    console.log("There was an error viewing your album: " + err?.toString());
    return { success: false, message: err?.toString() };
  }
};

//
const s3Client = new S3Client({
  region: region,
  apiVersion: "2006-03-01",
  credentials: fromCognitoIdentityPool({
    identityPoolId: IdentityPoolId,
  }),
});

export async function listObjects(bucketName: string) {
  try {
    // Construct the ListObjectsCommand
    const command = new ListObjectsCommand({ Bucket: albumBucketName });
    // Execute the command
    const response = await s3Client.send(command);
    // Handle the response
    console.log("Objects in bucket:", response.Contents);
    //return response.Contents;
    return { success: true, data: response.Contents };
  } catch (error) {
    console.error("Error listing objects:", error);
    return { success: false, message: error?.toString() };
  }
}
