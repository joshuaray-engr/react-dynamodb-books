import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = "BookLibrary";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
  "Access-Control-Allow-Methods": "PUT,OPTIONS"
};

export const handler = async (event) => {
  const httpMethod = event.requestContext?.http?.method || event.httpMethod;
  
  if (httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ message: "Preflight OK" }) };
  }

  try {
    const idRaw = event.pathParameters?.id;
    const id = idRaw ? Number(idRaw) : null;

    if (id === null || isNaN(id)) {
      return { 
        statusCode: 400, 
        headers: corsHeaders, 
        body: JSON.stringify({ error: "Required URL path parameter 'id' must be a valid number" }) 
      };
    }

    const requestBody = JSON.parse(event.body || "{}");
    const titleVal = requestBody.title || requestBody.newTitle || "Untitled Book";
    const rawPageCount = requestBody.page_count !== undefined ? requestBody.page_count : requestBody.newPageCount;
    const pageVal = (rawPageCount !== undefined && rawPageCount !== null && !isNaN(Number(rawPageCount))) ? Number(rawPageCount) : 0;

    const command = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id: id },
      UpdateExpression: "SET #t = :titleVal, #p = :pageVal",
      ExpressionAttributeNames: { "#t": "title", "#p": "page_count" },
      ExpressionAttributeValues: { ":titleVal": titleVal, ":pageVal": pageVal },
      ReturnValues: "ALL_NEW"
    });

    const databaseResponse = await docClient.send(command);

    return { 
      statusCode: 200, 
      headers: corsHeaders, 
      body: JSON.stringify({ message: "Book updated successfully!", updatedItem: databaseResponse.Attributes }) 
    };

  } catch (error) {
    console.error("Database Execution Error:", error);
    return { 
      statusCode: 500, 
      headers: corsHeaders, 
      body: JSON.stringify({ error: "Operation failed", details: error.message }) 
    };
  }
};
