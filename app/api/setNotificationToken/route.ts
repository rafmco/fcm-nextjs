import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { login, token } = await request.json();

    if (!login || !token) {
      return NextResponse.json(
        { error: "Login and token are required" },
        { status: 400 }
      );
    }

    const payload = {
      login: login,
      notification_token: token,
    };

    // Call the third-party API to store the token
    const response = await fetch(
      `${process.env.API_HOST}:${process.env.API_PORT}/setNotificationToken`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response is OK
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from third-party API:", errorData);
      return NextResponse.json(
        { message: errorData.message || "Error storing token" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Token stored successfully:", data);

    return NextResponse.json(
      { message: "Token stored successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error calling third-party API:", error);
    return NextResponse.json(
      { message: "Error calling third-party API" },
      { status: 500 }
    );
  }
}
