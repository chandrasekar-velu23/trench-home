const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

export async function getStrapiData(path: string) {
  try {
    console.log("Fetching from:", `${STRAPI_URL}${path}`);
    console.log("Token:", STRAPI_TOKEN);
    const response = await fetch(`${STRAPI_URL}${path}`, {

      // headers: {
      //   Authorization: `Bearer ${STRAPI_TOKEN}`,
      //   "Content-Type": "application/json",
      // },
    });

    if (!response.ok) {
      console.error(
        `Strapi Error: ${response.status} ${response.statusText}`
      );

      const errorText = await response.text();
      console.error("Error Details:", errorText);

      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Connection Refused. Is Strapi running?", error);
    return null;
  }
}