// 第三方库类型声明补丁

declare module '@wangeditor/editor-for-vue' {
  import { Component } from 'vue'
  export const Editor: Component
  export const Toolbar: Component
}

declare module 'three/examples/jsm/renderers/CSS2DRenderer' {
  import { Object3D } from 'three'
  export class CSS2DObject extends Object3D {
    constructor(element: HTMLElement)
    element: HTMLElement
  }
  export class CSS2DRenderer {
    domElement: HTMLElement
    setSize(width: number, height: number): void
    render(scene: any, camera: any): void
  }
}

declare module 'three/examples/jsm/lines/Line2' {
  import { Mesh } from 'three'
  export class Line2 extends Mesh {}
}

declare module 'three/examples/jsm/lines/LineGeometry' {
  import { BufferGeometry } from 'three'
  export class LineGeometry extends BufferGeometry {
    setPositions(positions: number[]): void
  }
}

declare module 'three/examples/jsm/lines/LineMaterial' {
  import { Material } from 'three'
  export class LineMaterial extends Material {
    constructor(parameters: { color: number; linewidth: number })
    resolution: { x: number; y: number; set(x: number, y: number): void }
  }
}

declare module 'three/examples/jsm/loaders/GLTFLoader' {
  import { Loader } from 'three'
  export class GLTFLoader extends Loader {
    load(
      url: string,
      onLoad: (gltf: { scene: any; animations: any[] }) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void
    setDRACOLoader(dracoLoader: any): void
  }
}

declare module 'three/examples/jsm/loaders/DRACOLoader' {
  import { Loader } from 'three'
  export class DRACOLoader extends Loader {
    setDecoderPath(path: string): void
  }
}

declare module 'three/examples/jsm/controls/OrbitControls' {
  import { Camera, EventDispatcher } from 'three'
  export class OrbitControls extends EventDispatcher {
    constructor(camera: Camera, domElement?: HTMLElement)
    enabled: boolean
    enableDamping: boolean
    dampingFactor: number
    update(): void
    dispose(): void
  }
}
