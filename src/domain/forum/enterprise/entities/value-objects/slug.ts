export class Slug {
  public value: string

  constructor(value: string) {
    this.value = value
  }

  /**
   * Receives a string and normalize it as a slug
   *
   * Example: "An example title" => "an-example-title"
   *
   * @param text {string}
   */
  static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD') // Remove todos os acentos
      .toLowerCase() // Transforma em minúsculo
      .trim()
      .replace(/\s+/g, '-') // Substituir todos os espaços em branco por -
      .replace(/[^\w-]+/, '') // Remover todos os caracteres não alfanúmericos
      .replace(/_/g, '-') // Substituir todos os _ por -
      .replace(/-+/g, '-') // Substituir - duplicados por apenas um -
      .replace(/^-|-$/g, '') // Remover os - do inicio e do final do texto

    return new Slug(slugText)
  }
}
