
### Run on IOS
```
npm run ios
```

### Run on Android as Debug
```
npm run android
```

### Build Release for Android
Build
```
npx react-native build-android --mode=release
```

Run
```
npm run android -- --mode="release"
```

# Android Play Store 설정

#### 개인 정보 처리 방침 작성하기
우선 간단하게 노션에 개인정보 처리 방침을 작성하고 이를 웹에 게시한다음에 해당 URL을 플레이 스토어에 추가할 수 있다.

#### 액세스 권한
로그인 및 회원가입 절차가 없기 때문에 앱 검수 시에 앱의 기능을 제한하지 않으므로 앱의 기능을 제한하지 않음을 선택할 수 있다.
만약에 회원 가입 및 로그인 기능이 있다면, 검수용 계정을 만들어서 해당 정보를 제공해야 한다.

#### 앱 연령 등급
연령 등급을 확인해서 검토가 한번 필요함.

### 유로 앱인데 가격 책정을 못하겠다.


### References
*For Android*
+ [Running On Device](https://reactnative.dev/docs/running-on-device?platform=android)
+ [Publishing to Google Play Store](https://reactnative.dev/docs/signed-apk-android)

* For IOS
+ 
