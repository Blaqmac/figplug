import { BuildCtx } from './ctx'

export interface Pkg {
  dir     :string            // absolute path of directory
  name    :string            // name of package
  version :string            // from package.json, or "" if undefined
  info    :{[k:string]:any}  // package.json, if found

  init(dir :string)
}

export const pkg :Pkg

export type ConstantDefinitions = { [name :string] : any }


export class ProductProps {
  name     :string
  version  :string
  entry    :string  // entry source file
  outfile  :string  // output js file
  basedir  :string  // base directory where tsconfig is expected to be found

  mapfile  :string  // output map file. default to {outfile}.map
  debug    :bool    // enable debugging features like assertions
  optimize :bool    // optimize output
  nomin    :bool    // disable minification (no effect if optimize=false)
  srcdir   :string  // source base directory. affects source maps
  clean    :bool    // clean build cache; always rebuild from source.
  libs     :LibBase[] // libraries
  banner   :string  // JavaScript to put at top of product code
  jsx      :string  // non-empty to enable JSX processing with named impl

  targetESVersion :number  // 0 == latest
}

export interface IncrementalBuildProcess extends Promise<void> {
  end() :void           // ends build process
  readonly ended :bool  // true after process has ended
}

export interface BuildResult {
  js  :string
  map :string
}

export class Product extends ProductProps {
  readonly outdir        :string               // dirname of outfile
  readonly output        :BuildResult          // changes on build
  readonly defines       :ConstantDefinitions  // definitions
  readonly definesInline :ConstantDefinitions  // definitions to be inlined
  readonly libs          :Lib[]
  readonly stdlibs       :StdLib[]

  constructor(props :Optional<ProductProps>)

  async build(c :BuildCtx) :Promise<void>
  buildIncrementally(
    c :BuildCtx,
    onStartBuild? :(p:Product, isInitial: bool)=>any,
    onEndBuild? :(p:Product)=>any
  ) :IncrementalBuildProcess
}


export class LibProps {
  dfile    :string
  jsfile   :string
  cachedir :string
}

export class LibBase {}

export class Lib extends LibBase, LibProps {
  constructor(dfile :string)
  constructor(props :Optional<LibProps> & { dfile :string })

  getDefines(debug :bool) :ConstantDefinitions
  getCode(c :BuildCtx) :Promise<string>
}

// StdLib represents a standard TypeScript library like "dom"
export class StdLib extends LibBase {
  readonly name :string
  constructor(name :string)
}
