(function (global) {
    var  app = global.app = global.app || {};    
    var SummaryDetailDataModel = kendo.data.ObservableObject.extend({
        summaryDetailDataSource: null,    
        init: function (e) {             
            var that = this,
                dataSource,
                jsonUrlToLoad;

            kendo.data.ObservableObject.fn.init.apply(that, []);    
            jsonUrlToLoad = "http://cooler.insigmainc.com/Controllers/AssetInfo.ashx?action=load";
            dataSource = new kendo.data.DataSource({  
                schema:{
                   parse: function(response) {                      
                        return response.data;
                    }
                },                
                transport: {
                       read:  {
                           url: jsonUrlToLoad,
                           dataType: "json",
                           type: "GET"                           
                      }  
                }
                
            });            
            that.set("summaryDetailDataSource", dataSource);
        }
    });
    app.summaryDetailService = {  
        viewModel: new SummaryDetailDataModel(),
        show: function(e){            
          app.summaryDetailService.viewModel.summaryDetailDataSource.read({Id : e.view.params.assetId});
        }        
    };    
  
})(window);