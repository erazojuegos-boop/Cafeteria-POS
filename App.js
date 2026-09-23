import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView, Alert } from 'react-native';

// Productos base iniciales
const PRODUCTOS_INICIALES = [
  { id: '1', nombre: 'Café Americano', precio: 45, tipo: 'preparado' },
  { id: '2', nombre: 'Café con Leche', precio: 55, tipo: 'preparado' },
  { id: '3', nombre: 'Piña Colada', precio: 65, tipo: 'preparado' },
  { id: '4', nombre: 'Churro de Plátano', precio: 20, tipo: 'reventa' },
  { id: '5', nombre: 'Helado Chocolate', precio: 30, tipo: 'reventa' },
];

export default function App() {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    setTotal(total + producto.precio);
  };

  const cobrar = () => {
    if (carrito.length === 0) {
      Alert.alert("Carrito vacío", "Selecciona al menos un producto para cobrar.");
      return;
    }
    Alert.alert("Cobro Exitoso", `Total Cobrado: L ${total}.00`, [
      { text: "OK", onPress: () => { setCarrito([]); setTotal(0); } }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.tituloHeader}>☕ CAFETERÍA POS</Text>
        <Text style={styles.subtituloHeader}>Honduras - Cobro Táctil</Text>
      </View>

      <View style={styles.contenido}>
        {/* Parrilla de Productos */}
        <View style={styles.areaProductos}>
          <Text style={styles.seccionTitulo}>Productos</Text>
          <FlatList
            data={PRODUCTOS_INICIALES}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.tarjetaProducto} onPress={() => agregarAlCarrito(item)}>
                <Text style={styles.nombreProducto}>{item.nombre}</Text>
                <Text style={styles.precioProducto}>L {item.precio}.00</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Panel de Carrito y Cobro */}
        <View style={styles.areaCarrito}>
          <Text style={styles.seccionTitulo}>Venta Actual</Text>
          <FlatList
            data={carrito}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemCarrito}>
                <Text style={styles.itemNombre}>{item.nombre}</Text>
                <Text style={styles.itemPrecio}>L {item.precio}.00</Text>
              </View>
            )}
          />

          <View style={styles.footerCarrito}>
            <Text style={styles.totalTexto}>TOTAL: L {total}.00</Text>
            <TouchableOpacity style={styles.botonCobrar} onPress={cobrar}>
              <Text style={styles.textoBotonCobrar}>💵 COBRAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf8f5', paddingTop: 30 },
  header: { backgroundColor: '#4a2c20', padding: 15, alignItems: 'center' },
  tituloHeader: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
  subtituloHeader: { color: '#e8d5c8', fontSize: 12 },
  contenido: { flex: 1, flexDirection: 'column', padding: 10 },
  areaProductos: { flex: 2 },
  areaCarrito: { flex: 2, backgroundColor: '#ffffff', borderRadius: 8, padding: 10, marginTop: 10, borderWidth: 1, borderColor: '#e2d9d0' },
  seccionTitulo: { fontSize: 16, fontWeight: 'bold', color: '#4a2c20', marginBottom: 10 },
  tarjetaProducto: { flex: 1, backgroundColor: '#8c5a47', margin: 5, padding: 15, borderRadius: 8, alignItems: 'center' },
  nombreProducto: { color: '#ffffff', fontWeight: 'bold', textAlign: 'center' },
  precioProducto: { color: '#f1ece6', marginTop: 5 },
  itemCarrito: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#f1ece6' },
  itemNombre: { fontSize: 14, color: '#2c2825' },
  itemPrecio: { fontSize: 14, fontWeight: 'bold', color: '#4a2c20' },
  footerCarrito: { marginTop: 10, paddingTop: 10, borderTopWidth: 2, borderTopColor: '#4a2c20' },
  totalTexto: { fontSize: 20, fontWeight: 'bold', color: '#4a2c20', textAlign: 'center', marginBottom: 10 },
  botonCobrar: { backgroundColor: '#2e7d32', padding: 15, borderRadius: 8, alignItems: 'center' },
  textoBotonCobrar: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' }
});
    
