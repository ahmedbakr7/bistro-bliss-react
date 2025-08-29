
/**
 * Routes index file - exports everything needed for the application
 */
import router from './routes';
export { paths } from './routePaths';
export { type AppRoutePath } from './routePaths';

// Export all route components for direct access if needed
export * from './routeImports';

// Export the router as default
export default router;
