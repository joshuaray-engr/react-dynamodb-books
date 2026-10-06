import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = "BookLibrary";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
  "Access-Control-Allow-Methods": "GET,OPTIONS"
};

export const handler = async (event) => {
  try {
    const command = new ScanCommand({ TableName: TABLE_NAME });
    const databaseResponse = await docClient.send(command);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ items: databaseResponse.Items })
    };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Internal Server Error", details: error.message })
    };
  }
};
