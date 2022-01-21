async function feed(parent, args, context, info) {
  const where = args.filter
    ? {
        OR: [
          { tag: { contains: args.filter } },
          { description: { contains: args.filter } },
          { url: { contains: args.filter } }
        ]
      }
    : {};

  const links = await context.prisma.link.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy
  });

  const faq = await context.prisma.faq.findMany();

  const users = await context.prisma.user.findMany();

  const count = await context.prisma.link.count({ where });

  return {
    id: 'main-feed',
    links,
    users,
    faq,
    count
  };
}

module.exports = {
  feed
};