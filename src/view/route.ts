const viewChildrenRoutes: {
  path: string;
  // Single route in lazy file
  lazy(): Promise<{ Component: () => JSX.Element }>;
}[] = [
  {
    path: 'menu',
    async lazy() {
      const Menu = await import('@/view/components/Menu');
      return { Component: Menu.default };
    },
  },
  {
    path: 'button',
    async lazy() {
      const Button = await import('@/view/components/Button');
      return { Component: Button.default };
    },
  },
  {
    path: 'flipcard',
    async lazy() {
      const FlipCard = await import('@/view/components/FlipCard');
      return { Component: FlipCard.default };
    },
  },
  {
    path: 'dropzone',
    async lazy() {
      const DropZone = await import('@/view/components/DropZone');
      return { Component: DropZone.default };
    },
  },
  {
    path: 'timeslot',
    async lazy() {
      const DropZone = await import('@/view/components/TimeSlot');
      return { Component: DropZone.default };
    },
  },
  {
    path: 'tag',
    async lazy() {
      const Tag = await import('@/view/components/Tag');
      return { Component: Tag.default };
    },
  },
  // {
  //   path: 'test',
  //   async lazy() {
  //     const Test = await import('@/view/components/Test');
  //     return { Component: Test.default };
  //   },
  // },
];

export default viewChildrenRoutes;
