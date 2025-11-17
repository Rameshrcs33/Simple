@objc(MyNativeModule)
class MyNativeModuleModule: NSObject {

  @objc
  func sayHello(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
      resolve("Hello from iOS!")
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
