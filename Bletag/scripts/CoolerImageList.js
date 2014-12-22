(function (global) {
    var app = global.app = global.app || {};

    CoolerImageListViewModel = kendo.data.ObservableObject.extend({
        CoolerImageListDataSource: null,
        init: function (e) {
            debugger;
            var that = this,
                dataSource,
                jsonUrlToLoad;
            var assetId = app.summaryDetailService.assetId;
            kendo.data.ObservableObject.fn.init.apply(that, []);
            jsonUrlToLoad = "http://cooler.insigmainc.com/Controllers/CoolerImage.ashx?asArray=0&dir=DESC&action=list&assetId=1";
            dataSource = new kendo.data.DataSource({
                schema: {
                    parse: function (response) {
                        debugger;
                        return response.records;
                    }
                },
                transport: {
                    read: {
                        url: jsonUrlToLoad,
                        dataType: "json",
                        type: "GET"
                    }
                }

            });
            that.set("CoolerImageListDataSource", dataSource);
        }
    });
    app.viewImageListService = {
        imageModel: new CoolerImageListViewModel(),
        show: function (e) {
            app.viewImageListService.imageModel.CoolerImageListDataSource.read({
                AssetId: app.summaryDetailService.assetId
            });
        },
        init: function (e) {
            var locationid;
        },
        getImgUrl: function (CoolerImageId) {
                debugger; 
            return "http://cooler.insigmainc.com/Controllers/CoolerImage.ashx?action=other&otherAction=Download&width=100&height=100&id=" + CoolerImageId;
        }
    };

})(window);