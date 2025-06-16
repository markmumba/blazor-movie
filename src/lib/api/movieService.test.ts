import movieService from './movieService';

describe('movieService utility methods', () => {
    let consoleWarnSpy: jest.SpyInstance;
    beforeAll(() => {
        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => { });
    });
    afterAll(() => {
        consoleWarnSpy.mockRestore();
    });

    it('should return correct image URL when imagePath is provided', () => {
        const url = movieService.getImageUrl('/test.jpg', 'w500');
        expect(url).toBe('https://image.tmdb.org/t/p/w500/test.jpg');
    });

    it('should return placeholder image when imagePath is null', () => {
        const url = movieService.getImageUrl(null, 'w500');
        expect(url).toBe('/placeholder-person.jpg');
    });

    it('should return correct poster URL', () => {
        const url = movieService.getPosterUrl('/poster.jpg', 'w342');
        expect(url).toBe('https://image.tmdb.org/t/p/w342/poster.jpg');
    });

    it('should return correct backdrop URL', () => {
        const url = movieService.getBackdropUrl('/backdrop.jpg', 'w1280');
        expect(url).toBe('https://image.tmdb.org/t/p/w1280/backdrop.jpg');
    });

    it('should return correct profile URL', () => {
        const url = movieService.getProfileUrl('/profile.jpg', 'w185');
        expect(url).toBe('https://image.tmdb.org/t/p/w185/profile.jpg');
    });
});

// Example structure for API method tests (fetch should be mocked)
describe('movieService API methods', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should fetch popular movies', async () => {
        // TODO: Implement fetch mock and test
    });

    // Add more tests for other API methods as needed
}); 