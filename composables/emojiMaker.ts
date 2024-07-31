export type SvgImageModule = typeof import('*.svg')
export type ImportModuleFunction = () => Promise<SvgImageModule>
export type EmojiSlice = 'head' | 'eyes' | 'eyebrows' | 'mouth' | 'detail'

const tabs: EmojiSlice[] = ['head', 'eyes', 'eyebrows', 'mouth', 'detail']
const canvasSize = 640

export function useEmojiMaker (
  canvasRef: Ref<HTMLCanvasElement | null>,
  _data?: any[]
) {
  const tab = ref<EmojiSlice>('head')
  const images = reactive<Record<EmojiSlice, string[]>>({
    head: [],
    eyes: [],
    eyebrows: [],
    mouth: [],
    detail: []
  })
  const selectedIndex = reactive<Record<EmojiSlice, number>>({
    head: 0,
    eyes: 0,
    eyebrows: 0,
    mouth: 0,
    detail: 0
  })

  onMounted(() => {
    loadImg()
  })

  const selectedImage = () => {
    return {
      head: images.head[selectedIndex.head],
      eyes: images.eyes[selectedIndex.eyes],
      eyebrows: images.eyebrows[selectedIndex.eyebrows],
      mouth: images.mouth[selectedIndex.mouth],
      detail: images.detail[selectedIndex.detail]
    }
  }

  const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const getRandom = () => {
    selectedIndex.head = randomInt(0, images.head.length - 1)
    selectedIndex.eyes = randomInt(0, images.eyes.length - 1)
    selectedIndex.eyebrows = randomInt(0, images.eyebrows.length - 1)
    selectedIndex.mouth = randomInt(0, images.mouth.length - 1)
    selectedIndex.detail = randomInt(0, images.detail.length - 1)
  }

  const loadImg = async () => {
    // head
    const headModules = import.meta.glob<SvgImageModule>('../assets/head/*.svg')
    const fullHeadImages = await resolveImportGlobModule(headModules)
    // eyes
    const eyesModules = import.meta.glob<SvgImageModule>('../assets/eyes/*.svg')
    const fullEyesImages = await resolveImportGlobModule(eyesModules)
    // eyebrows
    const eyebrowsModules = import.meta.glob<SvgImageModule>('../assets/eyebrows/*.svg')
    const fullEyebrowsImages = await resolveImportGlobModule(eyebrowsModules)
    // mouth
    const mouthModules = import.meta.glob<SvgImageModule>('../assets/mouth/*.svg')
    const fullMouthImages = await resolveImportGlobModule(mouthModules)
    // detail
    const detailModules = import.meta.glob<SvgImageModule>('../assets/details/*.svg')
    const fullDetailImages = await resolveImportGlobModule(detailModules)

    images.head = fullHeadImages
    images.eyes = ['', ...fullEyesImages]
    images.eyebrows = ['', ...fullEyebrowsImages]
    images.mouth = ['', ...fullMouthImages]
    images.detail = ['', ...fullDetailImages]

    getRandom()
    draw()
  }
  const pathToImage = (path: string) => {
    return new Promise<HTMLImageElement | null>((resolve) => {
      if (path === '') {
        resolve(null)
      }
      console.log(Image, '---------')
      const img = new Image(10, 10)
      img.src = path
      img.onload = () => {
        resolve(img)
      }
      img.onerror = () => {
        console.error(`Failed to load image: ${path}`)
        resolve(null)
      }
    })
  }
  const resolveImportGlobModule = async (modules: Record<string, ImportModuleFunction>) => {
    const imports = Object.values(modules).map((importFn: () => any) => importFn())
    const loadedModules = await Promise.all(imports)

    return loadedModules.map((module: { default: any; }) => module.default)
  }

  const exportImage = (blob: Blob | null) => {
    if (!blob) { return }
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `emoji_${Date.now()}`
    document.body.appendChild(a) // 需要先添加到文档中才能触发点击
    a.click()
    document.body.removeChild(a) // 使用完毕后移除
  }

  const toSVGBlob = async () => {
    const parser = new DOMParser()
    const documents = await Promise.all(Object.values(selectedImage()).map((image: string) => fetch(image).then(response => response.text())))
    const svg = document.createElement('svg')
    svg.setAttribute('width', '32')
    svg.setAttribute('height', '32')
    svg.setAttribute('viewBox', '0 0 32 32')
    svg.setAttribute('fill', 'none')
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

    // eslint-disable-next-line array-callback-return
    documents.flatMap((doc: string) => {
      const childNode = parser.parseFromString(doc, 'image/svg+xml').documentElement
      svg.appendChild(childNode)
    })
    return new Blob([svg.outerHTML], { type: 'image/svg+xml' })
  }

  const draw = () => {
    const headPath = selectedImage().head
    const eyesPath = selectedImage().eyes
    const eyebrowsPath = selectedImage().eyebrows
    const mouthPath = selectedImage().mouth
    const detailPath = selectedImage().detail
    Promise.all([
      pathToImage(headPath),
      pathToImage(eyesPath),
      pathToImage(eyebrowsPath),
      pathToImage(mouthPath),
      pathToImage(detailPath)
    ]).then((images) => {
      const ctx = (canvasRef.value as HTMLCanvasElement).getContext('2d')
      ctx?.clearRect(0, 0, (canvasRef.value as HTMLCanvasElement).width, (canvasRef.value as HTMLCanvasElement).height)

      images.forEach((img) => {
        img && ctx?.drawImage(img, 0, 0, canvasSize, canvasSize)
      });

      (canvasRef.value as HTMLCanvasElement).classList.add('animation')
      setTimeout(() => {
        (canvasRef.value as HTMLCanvasElement).classList.remove('animation')
      }, 500)
    })
  }

  return {
    canvasSize,
    selectedIndex,
    tab,
    tabs,
    images,
    selectedImage,
    getRandom,
    exportImage,
    toSVGBlob,
    draw
  }
}
