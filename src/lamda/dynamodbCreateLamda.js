import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = "BookLibrary";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
  "Access-Control-Allow-Methods": "POST,OPTIONS"
};

export const handler = async (event) => {
  try {
    const requestBody = JSON.parse(event.body || "{}");

    if (requestBody.id !== undefined && requestBody.id !== null) {
      requestBody.id = Number(requestBody.id);
    }
    
    if (requestBody.page_count !== undefined && requestBody.page_count !== null) {
      requestBody.page_count = Number(requestBody.page_count);
    }

    const command = new PutCommand({ TableName: TABLE_NAME, Item: requestBody });
    await docClient.send(command);

    return {
      statusCode: 201,
      headers: corsHeaders,
      body: JSON.stringify({ message: "Item saved successfully!", newItem: requestBody })
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
