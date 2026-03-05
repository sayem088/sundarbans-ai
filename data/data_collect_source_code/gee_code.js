var geometry = /* color: #d63000 */ee.Geometry.Polygon(
        [[[89.79313652109681, 21.867035431669226],
          [89.79519645762025, 21.84951020574503],
          [89.81811325144349, 21.84839489132913],
          [89.8367385108429, 21.857237502213927],
          [89.8352793891388, 21.873567011107905],
          [89.82214729380189, 21.88121335843603],
          [89.79433815073548, 21.87563793730047]]]);

var studyArea = geometry;

Map.centerObject(studyArea, 11);
Map.addLayer(studyArea, {color: 'red'}, 'Study Area');

var s1 = ee.ImageCollection('COPERNICUS/S1_GRD')
  .filterBounds(studyArea)
  .filterDate('2023-01-01', '2024-12-31')
  .filter(ee.Filter.eq('instrumentMode', 'IW'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .select('VV');

// print('Sentinel-1 Collection', s1);

var s1_db = s1.map(function(img){
  return img.log10().multiply(10).copyProperties(img, ['system:time_start']);
});


var months = ee.List.sequence(1,12);

var monthly = ee.ImageCollection.fromImages(
  months.map(function(m){

    var filtered = s1_db.filter(ee.Filter.calendarRange(m, m, 'month'));

    return filtered.median()
      .clip(studyArea)
      .set('month', m);

  })
);

// print('Monthly Images', monthly);


var flood = monthly.map(function(img){
  var water = img.lt(-17);
  return water.rename('water').set('month', img.get('month'));
});

var first = flood.first();

Map.addLayer(first,
  {min:0, max:1, palette:['white','blue']},
  'Flood Map');

Export.image.toDrive({
  image: first,
  description: 'Sundarbans_Flood_Map',
  folder: 'Sundarbans_AI',
  fileNamePrefix: 'flood_map_2023',
  region: studyArea,
  scale: 10,
  maxPixels: 1e13
});

var s1_image = s1_db.median().clip(studyArea);

Export.image.toDrive({
  image: s1_image,
  description: 'Sentinel1_Backscatter',
  folder: 'Sundarbans_AI',
  fileNamePrefix: 'sentinel1_vv',
  region: studyArea,
  scale: 10,
  maxPixels: 1e13
});
