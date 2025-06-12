import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatRuntime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatYear(dateString: string) {
  return new Date(dateString).getFullYear();
};

export function most_repeated_genre(array: string[]) {
  const genre_count = array.reduce((acc: { [key: string]: number }, genre: string) => {
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {});

  const most_repeated_genre_id = Object.entries(genre_count)
    .filter(([_, count]) => count >= 5)
    .reduce((max, current) => {
      if (!max.length || genre_count[current[0]] > genre_count[max[0]]) {
        return current;
      }
      return max;
    }, ['', 0] as [string, number]);

  return most_repeated_genre_id[0] || '';
}

export function getMostFrequentGenre(threshold: number = 5): string | null {
  try {
    // Get the stored genre clicks from localStorage
    const clickedGenres = JSON.parse(localStorage.getItem('clickedGenres') || '[]');
    console.log(clickedGenres);

    // Create a map to count genre occurrences
    const genreCount = new Map<string, number>();

    // Count occurrences of each genre
    clickedGenres.forEach((genreString: string) => {
      const genres = genreString.split(',');
      genres.forEach(genre => {
        genreCount.set(genre, (genreCount.get(genre) || 0) + 1);
      });
    });
    console.log(genreCount);

    // Find the genre with the highest count that meets the threshold
    let mostFrequentGenre: string | null = null;
    let highestCount = 0;

    genreCount.forEach((count, genre) => {
      if (count >= threshold && count > highestCount) {
        highestCount = count;
        mostFrequentGenre = genre;
      }
    });
    console.log(mostFrequentGenre);
    return mostFrequentGenre;
  } catch (error) {
    console.error('Error getting most frequent genre:', error);
    return null;
  }
}