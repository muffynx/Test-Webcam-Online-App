

# Test Webcam Online App

React Native ที่สร้างด้วย Expo ที่สามารถ ทดสอบเว็บแคมหรือกล้องบนอุปกรณ์มือถือ ถ่ายรูป, บันทึกลงแกลเลอรี, สลับกล้องหน้า–หลัง และเปิด/ปิดแฟลชได้. 

## Features

- **ปุ่มถ่ายรูป**: แสดงภาพของกล้องปัจจุบัน
- **ปุ่มถ่ายรูปใหม่**: เมื่อได้ภาพที่ถ่ายให้แสดงรูปที่ถ่าย
- **ปุ่มบันทึก**: เมื่อกดแล้วให้บันทึกรูปลงอัลบั้มในเครื่อง
- **ปุ่มสลับกล้อง**: ให้กดแล้วทำการเปลี่ยนกล้องหน้าเป็นกล้องหลัง สลับกัน
- **ปุ่มเปิดไฟแฟลช**: กดเพื่อเปิดไฟหลังกล้องถ่ายรูป


## Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/muffynx/Test-Webcam-Online-App.git
cd expo-camera-app
```

### Step 2: Install Dependencies
Install the required Node.js packages:
```bash
npm install
# or
yarn install
```

### Step 3: Install Expo Go
- Download and install the **Expo Go** app on your mobile device:
  - [App Store (iOS)](https://apps.apple.com/app/expo-go/id982107779)
  - [Google Play (Android)](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Step 4: เปิด Windows Firewall
  - [เปิด Windows Firewall ]( https://www.playpark.com/th-th/basic-computer/closed-firewall-windows10/)


### Step 5: Run the Application
1. Start the Expo development server:
   ```bash
   npx expo start --clear
   ```
2. **ให้คอมพิวเตอร์และมือถืออยู่ในวง Wi-Fi เดียวกัน**

   
### Step 6: ให้สิทธิ์เพื่อเข้าถึงกล้อง (Permissions)


## Usage
1. **หน้าจอเริ่มต้น**: 
   - กดปุ่ม "Start test" เพื่อขอสิทธิ์และเข้าสู่โหมดกล้อง
2. **โหมดกล้อง**:
   - ปุ่มซ้าย: เปิด/ปิดแฟลช (ไอคอนเปลี่ยนตามสถานะ)
   - Use the middle button (red circle) to take a photo.
   - Use the right button to switch between front and back cameras.
3. **หน้าพรีวิวรูป**:
   - บันทึก: กดไอคอน "save"
   - ถ่ายใหม่: กดไอคอน "refresh"

### รูปภาพ



<img width="446" height="870" alt="22" src="https://github.com/user-attachments/assets/dce726ae-82d8-45e7-8777-53ffe3a60a5f" />

<img width="473" height="896" alt="IMG_2480"  src="https://github.com/user-attachments/assets/f531ada1-f21f-49a3-a6e6-52468aa820d1" />

<img width="473" height="896" alt="IMG_2480" src="https://github.com/user-attachments/assets/8c0a4e2e-d947-446e-b719-851a8a4b9fbb" />
<img width="473" height="896" alt="IMG_2480" src="https://github.com/user-attachments/assets/79ef6420-1c5e-4b2c-91a0-c6d19c6ca9ff" />
