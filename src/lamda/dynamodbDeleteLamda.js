import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = "BookLibrary";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
  "Access-Control-Allow-Methods": "DELETE,OPTIONS"
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

    const command = new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { id: id },
      ReturnValues: "ALL_OLD"
    });

    const databaseResponse = await docClient.send(command);

    if (!databaseResponse.Attributes) {
      return { 
        statusCode: 404, 
        headers: corsHeaders, 
        body: JSON.stringify({ message: `Book with id ${id} not found.` }) 
      };
    }

    return { 
      statusCode: 200, 
      headers: corsHeaders, 
      body: JSON.stringify({ message: "Book deleted successfully!", deletedItem: databaseResponse.Attributes }) 
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
