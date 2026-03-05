prediction = model.predict(image.flatten().reshape(-1,1))

prediction_map = prediction.reshape(image.shape)

plt.imshow(prediction_map, cmap='Blues')
plt.title("Predicted Flood Risk")
plt.show()
