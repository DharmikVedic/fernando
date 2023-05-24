const api_url = "https://json.astrologyapi.com/v1";

export async function FetchApi(input) {
  var auth = "Basic NjIwNDU3OjJiYTdhNTRlNDJmMzlmYTZhMDU2MDJkOTYyZmM5ZWRi";
  if (input) {
    const arg = `${api_url}/${input.apiName}`;
    const response = await fetch(arg, {
      method: "POST",
      headers: {
        Authorization:
          "Basic NjIwNDU3OjJiYTdhNTRlNDJmMzlmYTZhMDU2MDJkOTYyZmM5ZWRi",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input.userData),
    });
    return await response.json();
  } else {
    return "loading...";
  }
}
