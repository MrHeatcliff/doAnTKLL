#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#include <Wire.h>
#include "MAX30100_PulseOximeter.h"
#include "addons/TokenHelper.h" //Provide the token generation process info.
#include "addons/RTDBHelper.h"  //Provide the RTDB payload printing info and other helper functions.

#define REPORTING_PERIOD_MS     1000
// Insert your network credentials
#define WIFI_SSID "FPT phong 12"
#define WIFI_PASSWORD "matkhaula1"
// Insert Firebase project API Key
#define API_KEY "AIzaSyBZUvbeKXJlo_5RJqKJEVk4b0GqgnE3FCY"
// Insert RTDB URLefine the RTDB URL */
#define DATABASE_URL "https://doantkll-73b19-default-rtdb.firebaseio.com/" // Insert RTDB URLefine the RTDB URL */
// Define user authentication
#define USER_EMAIL "ttdat170703@gmail.com"// Define user authentication
#define USER_PASSWORD "admin@"

// PulseOximeter is the higher level interface to the sensor
// it offers:
//  * beat detection reporting
//  * heart rate calculation
//  * SpO2 (oxidation level) calculation
PulseOximeter pox;

//Define Firebase Data object
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
bool signupOK = false; //since we are doing an anonymous sign in 

String uid;
String databasePath;

uint32_t tsLastReport = 0;

float beat_send = 0;
uint8_t spo2_send = 0;

// Callback (registered below) fired when a pulse is detected
void onBeatDetected(){  
  Serial.println("Beat!");
}

void setup()
{
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
  
  Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);
  /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the user sign in credentials */
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; // see addons/TokenHelper.h

  // Comment or pass false value when WiFi reconnection will control by your code or third party library e.g. WiFiManager
  Firebase.reconnectNetwork(true);

  Firebase.begin( & config, & auth);

  Firebase.setDoubleDigits(5);
  Serial.print("Initializing pulse oximeter..");
  // Initialize the PulseOximeter instance
  // Failures are generally due to an improper I2C wiring, missing power supply
  // or wrong target chip
  if (!pox.begin()) {
      Serial.println("FAILED");
      for(;;);
  } else {
      Serial.println("SUCCESS");
  }
  // The default current for the IR LED is 50mA and it could be changed
  //   by uncommenting the following line. Check MAX30100_Registers.h for all the
  //   available options.
  // pox.setIRLedCurrent(MAX30100_LED_CURR_7_6MA);
  // Register a callback for the beat detection
  pox.setOnBeatDetectedCallback(onBeatDetected);
}

void loop()
{
    // Make sure to call update as fast as possible
    pox.update();
    if (millis() - tsLastReport > REPORTING_PERIOD_MS) {
      uid = auth.token.uid.c_str();
      beat_send = pox.getHeartRate();
      Serial.print("Heart rate:");
      Serial.print(pox.getHeartRate());
      spo2_send = pox.getSpO2();
      Serial.print("bpm / SpO2:");
      Serial.print(pox.getSpO2());
      Serial.println("%");
      pox.shutdown();
      databasePath = "/data/" + uid + "/beat";
      Firebase.setFloat(fbdo, databasePath, beat_send);
      databasePath = "/data/" + uid + "/SpO2";
      Firebase.setFloat(fbdo, databasePath, spo2_send);
      pox.resume();

      tsLastReport = millis();
    }
}
