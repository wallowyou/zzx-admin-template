const Mock = require("mockjs");

const data = Mock.mock({
  "items|11": [
    {
      id: "@increment",
      title: "@word(6)",
      code: "@word(5)",
      "status|1": ["整数", "小数"],
      "transform|1": ["可上报可下发", "可上报"],
      "number|123.3": 1,
      author: "name",
      display_time: "@datetime",
      pageviews: "@integer(300, 5000)"
    }
  ]
});

module.exports = [
  {
    url: "/vue-admin-template/params/list",
    type: "get",
    response: () => {
      const items = data.items;
      return {
        code: 200,
        data: {
          total: items.length,
          list: items
        }
      };
    }
  }
];
