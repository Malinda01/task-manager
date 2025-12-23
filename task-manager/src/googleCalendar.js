const CLIENT_ID =
  "474738818390-20gobfk8fciostbe474s9n8cuvu6856o.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

let tokenClient;
let accessToken = null;

export function initGoogleAuth(setSignedIn) {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: (response) => {
      accessToken = response.access_token;
      setSignedIn(true);
    },
  });
}

export function signIn() {
  tokenClient.requestAccessToken();
}

export async function addEventToCalendar(task) {
  if (!accessToken) return alert("Please sign in first");

  const event = {
    summary: task.title,
    description: task.description,
    start: {
      dateTime: task.start,
      timeZone: "Asia/Colombo",
    },
    end: {
      dateTime: task.end,
      timeZone: "Asia/Colombo",
    },
  };

  await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    }
  );
}
