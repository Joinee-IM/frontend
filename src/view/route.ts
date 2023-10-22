const viewChildrenRoutes: {
  path: string;
  // Single route in lazy file
  lazy(): Promise<{ Component: () => JSX.Element }>;
}[] = [
  // {
  //   path: 'menu',
  //   async lazy() {
  //     const Menu = await import('@/view/components/Menu');
  //     return { Component: Menu.default };
  //   },
  // },
];

export default viewChildrenRoutes;
