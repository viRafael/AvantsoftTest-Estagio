export function firstLettlerWithoutRepert(name: string) {
  const normalizedName = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z]/g, '');

  const frequency = new Map<string, number>();

  for (const letter of normalizedName) {
    frequency.set(letter, (frequency.get(letter) || 0) + 1);
  }

  for (const letter of normalizedName) {
    if (frequency.get(letter) === 1) {
      return letter;
    }
  }

  return '_';
}
