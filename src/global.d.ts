// symbolic aliases
type int = number
type float = number
type byte = number
type bool = boolean

// non-standard global constants
declare const DEBUG :boolean
declare const VERSION :string
declare const VERSION_TAG :string
declare const VERSION_WITH_TAG :string
declare const FIGMA_API_VERSIONS :string[]
declare const global :{[k:string]:any}

// panic prints a message, stack trace and exits the process
//
declare function panic(msg :any, ...v :any[]) :void

// repr returns a detailed string representation of the input
//
declare function repr(obj :any) :string

// print works just like console.log
declare function print(msg :any, ...v :any[]) :void

// dlog works just like console.log but is stripped out from non-debug builds
declare function dlog(msg :any, ...v :any[]) :void

// assert checks the condition for truth, and if false, prints an optional
// message, stack trace and exits the process.
// assert is removed in release builds
declare var assert :AssertFun
declare var AssertionError :ErrorConstructor
declare interface AssertFun {
  (cond :any, msg? :string, cons? :Function) :void

  // throws can be set to true to cause assertions to be thrown as exceptions,
  // or set to false to cause the process to exit.
  // Only has an effect in Nodejs-like environments.
  // false by default.
  throws :bool
}
