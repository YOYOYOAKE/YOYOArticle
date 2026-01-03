import readingTime from 'reading-time'
import { toString } from 'mdast-util-to-string'

function remarkReadingTime() {
  // @ts-expect-error
  return (tree, file) => {
    const { frontmatter } = file.data.astro

    const textOnPage = toString(tree)
    const stats = readingTime(textOnPage)

    if (frontmatter.words === undefined) {
      frontmatter.words = stats.words
    }
  }
}

export default remarkReadingTime
