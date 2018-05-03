# CodePushDemo
Demo Code Push for React Native Apps

# Prerequisites
1. Initially, create react native project normally.
> react-native init <app-name>

2. Generate sign-key 
> keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

3. Setting up gradle variables
   - Place the my-release-key.keystore file under the android/app directory in your project folder.
   - Edit the file ~/.gradle/gradle.properties or android/gradle.properties and add the following (replace ***** with the correct keystore password, alias and key password),
   eg.   
      MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
      MYAPP_RELEASE_KEY_ALIAS=my-key-alias
      MYAPP_RELEASE_STORE_PASSWORD=*****
      MYAPP_RELEASE_KEY_PASSWORD=*****

   ---------------------------
   
# Set Up
1. Install appcenter-cli globally.
> npm install -g appcenter-cli

2. Create an App Center account or log in through the CLI by using appcenter login
Reference - https://docs.microsoft.com/en-us/appcenter/distribution/codepush/cli

3. Register your app via CLI or App Center Portal.
> appcenter apps create -d <appDisplayName> -o <operatingSystem>  -p <platform>
eg. appcenter apps create -d MyApp -o Android -p React-Native

4. With the original CodePush, apps automatically had two deployments (Staging and Production).
   In App Center, you'll have to create deployment keys yourself
> appcenter codepush deployment add -a <ownerName>/<appName> Staging
> appcenter codepush deployment add -a <ownerName>/<appName> Production

   After that, you can access the deployment keys for both deployments using  
> appcenter codepush deployment list -a <ownerName>/<appName>

5. Add App Center Client SDK in react-native project.
> npm install appcenter appcenter-analytics appcenter-crashes --save

6. Link the SDK
> react-native link

  In this step, it will ask for the secret key for App Center. You'll have to copy the secret key of your registered application from the App Center Portal
  This secret key will be stored in the following directories: 
  Android => project-name\android\app\src\main\assets\appcenter-config.json
  IOS     => project-name\ios\project-name\AppCenter-Config.plist
  It's important make sure to save this screct key for Anatylics and Crashes.
  
7. Add Client SDK for Code Push and Link SDK.
> npm install react-native-code-push --save
> react-native link
  
  It will ask for deployment key for the specified deployment( Staging or Production).

  
8. Integrate in your root app component.
   App.js
      import codePush from "react-native-code-push";
      class App extends Component {
        ...
      }

      let codePushOptions = { 
        checkFrequency: codePush.CheckFrequency.ON_APP_RESUME, 
        installMode: codePush.InstallMode.ON_NEXT_RESUME 
      }
      App = codePush(codePushOptions)(App);

      export default App

*** *****Finished Integration *** ******
 
- Build release version and Install on device.
> cd android
> .\gradlew assembleRelease 

- Releasing updates and push via CLI
> appcenter codepush release-react -a <ownerName>/<appName> -d <deploymentName> -t <targetBinaryVersion>

- Check your application's deployment history using 
> appcenter codepush deployment list -a <owner>/<app-name>

