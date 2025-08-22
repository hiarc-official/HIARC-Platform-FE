/**
 * React Query Mutation Meta Types
 * Based on TkDodo's recommendations for meta-based invalidation
 */

export interface MutationMeta {
  /**
   * Skip automatic invalidation entirely
   */
  skipInvalidation?: boolean;

  /**
   * Specific query keys to invalidate after successful mutation
   * Can be a single query key or an array of query keys
   */
  invalidateQueries?: readonly unknown[] | readonly (readonly unknown[])[];

  /**
   * Await specific query invalidations (for precise timing)
   */
  awaitInvalidation?: boolean;

  /**
   * Additional meta information for debugging or tracking
   */
  description?: string;

  /**
   * Custom success callback that runs after global invalidation
   */
  onSuccessAfterInvalidation?: () => void;
}

// Extend the default mutation meta type
declare module '@tanstack/react-query' {
  interface MutationMeta extends MutationMeta {}
}