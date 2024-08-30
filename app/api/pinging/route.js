export async function GET(req) {
    console.log("200");
    
    return new Response(JSON.stringify(true), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  