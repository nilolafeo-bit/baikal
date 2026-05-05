// Префикс пути для всех внутренних ссылок: учитывает astro `base`.
// На обычном домене base='/' — pathTo('/foo/') возвращает '/foo/'.
// На превью с base='/baikal/' — pathTo('/foo/') возвращает '/baikal/foo/'.

const BASE = import.meta.env.BASE_URL;

export function pathTo(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const trimmed = path.startsWith('/') ? path.slice(1) : path;
  return BASE + trimmed;
}
