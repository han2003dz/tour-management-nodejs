const getStatistics = async (model) => {
  const stats = await model.aggregate([
    {
      $facet: {
        total: [{ $match: { deleted: false } }, { $count: "count" }],
        active: [
          { $match: { deleted: false, status: "active" } },
          { $count: "count" },
        ],
        inactive: [
          { $match: { deleted: true, status: "inactive" } },
          { $count: "count" },
        ],
      },
    },
  ]);

  return {
    total: stats[0].total[0]?.count || 0,
    active: stats[0].active[0]?.count || 0,
    inactive: stats[0].inactive[0]?.count || 0,
  };
};

module.exports = getStatistics;
