(function (global) {
    var app = global.app = global.app || {};

    CoolerDataListViewModel = kendo.data.ObservableObject.extend({
        CoolerDataListDataSource: null,
        init: function (e) {
            var that = this,
                dataSource,
                jsonUrlToLoad;
            var assetId = app.summaryDetailService.assetId;
            kendo.data.ObservableObject.fn.init.apply(that, []);
            jsonUrlToLoad = "http://cooler.insigmainc.com/Controllers/CoolerInfo.ashx?action=list&AsArray=0&sort=CoolerInfoId&dir=DESC&assetId=" + assetId;
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
            that.set("CoolerDataListDataSource", dataSource);
        }
    });   
    app.viewDataListService = {
        show: function (e) {
            app.viewDataListService.viewModel.CoolerDataListDataSource.read({
                AssetId: app.summaryDetailService.assetId
            });
        },       
        viewModel: new CoolerDataListViewModel(),
        dateRenderer: function (date) {
            var currentDate = new Date(parseInt(date.substr(6)));
            return currentDate;
        },
        getPurityStatus: function (PurityIssue) {
            return PurityIssue ? 'Yes' : 'No';
        },
        getImgUrl: function (CoolerImageId) {
            //To Do for small Image***
            var imageUrl = "http://cooler.insigmainc.com/Controllers/CoolerImage.ashx?action=other&otherAction=Download&width=100&height=100&id=" + CoolerImageId;
            return imageUrl;
        },
        getPurityValue: function (ForeignProduct) {
            if (ForeignProduct === 0) {
                toReturn = "Pure";
            } else {
                toReturn = "Impure";
            }
            return toReturn;
        },
        getStockValue: function (ForeignProduct, Stock) {

            var toReturn;
            toReturn = ((Stock - ForeignProduct));
            //if stock < 60% of Spaces, show in Red otherwise show in Black
            if (toReturn < 60) {
                toReturn = "toReturn";
                return toReturn;
            }
        }
    };

})(window);